class GameController < ApplicationController

  include Tubesock::Hijack

  def socket

    hijack do |tubesock|

      player_name = nil

      # Outbound
      # Each player is using his own redis thread with extra redis connection
      redis_thread = Thread.new do
        redis = Redis.new(:host => REDIS_URL.host, :port => REDIS_URL.port, :password => REDIS_URL.password)
        redis.subscribe 'game' do |on|
          on.message do |channel, message|

            # Outgoing Types:
            # players: []
            # question: { category: '', id: '', question: '', answers: [] }
            # chat: { sender: '', message: '' }

            logger.debug "Outgoing websocket to #{player_name}: #{message}"
            tubesock.send_data message
          end
        end
      end

      # Inbound
      tubesock.onmessage do |message|

        message = JSON.parse(message, :symbolize_names => true)
        logger.debug "Incoming websocket from #{player_name}: #{message}"
        next unless message[:type] && message[:content].kind_of?(Hash)
        type, content = message[:type].to_sym, message[:content]

        # Types:
        # :join, content: { name: '' }
        # :chat, content: { message: '' }

        case type
        when :join
          REDIS.srem :players, player_name
          player_name = content[:name]
          REDIS.sadd :players, content[:name]
          REDIS.publish 'game', { players: REDIS.smembers( :players ) }.to_json
        when :chat
          REDIS.publish 'game', { chat: {sender: player_name, message: content[:message]} }.to_json
        else
          logger.debug "Unhandled socket message type: #{type}"
          #tubesock.send_data 'direct'
          REDIS.publish 'game', { relay: message }.to_json
        end

      end

      # stop redis subscriber when client leaves
      tubesock.onclose do
        logger.debug "Socket close from: #{player_name}"
        REDIS.srem :players, player_name
        REDIS.publish 'game', { players: REDIS.smembers( :players ) }.to_json
        redis_thread.kill
      end

    end

  end


  def start
    question = Question.order('RANDOM()').first
    REDIS.publish 'game', question.to_socket_json
    render( nothing: true )
  end


end
