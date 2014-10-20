class GameController < ApplicationController

  include Tubesock::Hijack

  # TODO: workaround for Redis limitation on heroku
  $players = Set.new

  def socket

    hijack do |tubesock|

      player_name = nil

      # Outbound
      # Each player is using his on redis thread
      redis_thread = Thread.new do
        Redis.new.subscribe 'game' do |on|
          on.message do |channel, message|

            # Outgoing Types:
            # players: []

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
        # join, content: {name: ''}

        case type
        when :join
          player_name = content[:name]
          $players.add( content[:name] )
          Redis.new.publish 'game', { players: $players.to_a }
        else
          logger.debug "Unhandled socket message type: #{type}"
          #tubesock.send_data 'direct'
          Redis.new.publish 'game', { relay: message}
        end

      end

      # stop listening when client leaves
      tubesock.onclose do
        logger.debug "Socket close from: #{player_name}"
        $players.delete( player_name )
        redis_thread.kill
      end

    end

  end


end
