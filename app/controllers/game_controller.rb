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
            tubesock.send_data message
          end
        end
      end

      # Inbound
      tubesock.onmessage do |message|
        Redis.new.publish 'game', message
      end

      # stop listening when client leaves
      tubesock.onclose do
        redis_thread.kill
      end

    end

  end


end
