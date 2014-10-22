class GameController < ApplicationController

  include Tubesock::Hijack

  def socket

    hijack do |tubesock|

      player = Player.new

      # Outbound types:
      # players: []
      # question: { category: '', id: '', question: '', answers: [] }
      # chat: { sender: '', message: '' }

      # Each player is using his own redis thread with extra redis connection
      redis_thread = Thread.new do
        redis = Redis.new(:host => REDIS_URL.host, :port => REDIS_URL.port, :password => REDIS_URL.password)
        redis.subscribe 'game' do |on|
          on.message do |channel, message|
            logger.debug "Outgoing websocket to #{player.name} (#{player.uid}): #{message}"
            tubesock.send_data message
          end
        end
      end

      # Inbound types:
      # :join, content: { name: '' }
      # :chat, content: { message: '' }
      # :answer, content: { question_id: '', answer_id: '' }

      tubesock.onmessage do |message|

        message = JSON.parse(message, :symbolize_names => true)
        logger.debug "Incoming websocket from #{player.name} (#{player.uid}): #{message}"
        next unless message[:type] && message[:content].kind_of?(Hash)
        type, content = message[:type].to_sym, message[:content]

        case type
        when :join
          player.name = content[:name]
          player.save
          REDIS.publish 'game', Player.players_socket_json
        when :chat
          REDIS.publish 'game', { chat: {sender: player.name, message: content[:message]} }.to_json
        when :answer
          question = Question.find content[:question_id]
          if question.solution == content[:answer_id].to_i
            player.score += 1
            logger.debug "Correct answer to question #{question.id} from: #{player.name} (#{player.uid})"
          else
            player.score -= 1
            logger.debug "Wrong answer to question #{question.id} from: #{player.name} (#{player.uid})"
          end
          player.save
          # FIXME: just pushing the next question for now
          REDIS.publish 'game', Player.players_socket_json
          REDIS.publish 'game', Question.random.to_socket_json
        else
          logger.debug "Unhandled socket message type: #{type}"
          #tubesock.send_data 'direct'
          REDIS.publish 'game', { relay: message }.to_json
        end

      end

      # stop redis subscriber when client leaves
      tubesock.onclose do
        logger.debug "Socket close from: #{player.name} (#{player.uid})"
        player.destroy
        REDIS.publish 'game', Player.players_socket_json
        redis_thread.kill
      end

    end

  end


  def start
    REDIS.publish 'game', Question.random.to_socket_json
    render( nothing: true )
  end


end
