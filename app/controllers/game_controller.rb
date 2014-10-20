class GameController < ApplicationController

  include Tubesock::Hijack

  def socket

    hijack do |tubesock|

      # TODO: create different channels

      # Outbound
      # Each player is using his on redis thread
      redis_thread = Thread.new do
        Redis.new.subscribe 'game' do |on|
          on.message do |channel, message|

            # TODO: Types:
            # players: {names: []}
            # answer: {player: '', question_id: '', answer_id: '', correct: ''}

            tubesock.send_data message
          end
        end
      end

      # Inbound
      tubesock.onmessage do |message|

        message = JSON.parse(message)
        logger.debug "Incoming websocket: #{message}"

        # TODO: Types:
        # join: {name: ''}
        # answer: {player: '', question_id: '', answer_id: ''}





        #tubesock.send_data 'direct'
        Redis.new.publish 'game', message
      end

      # stop listening when client leaves
      tubesock.onclose do
        redis_thread.kill
      end

    end

  end


end
