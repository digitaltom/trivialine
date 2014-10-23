class Player
  attr_accessor :name
  attr_accessor :uid
  attr_accessor :score

  def initialize
    self.score = 0
    self.uid = SecureRandom.hex[0..3]
  end

  def destroy
    REDIS.smembers(:players).each do |p|
      REDIS.srem(:players, p) if JSON.parse(p)['uid'] == uid
    end
  end

  # Store the player in the active players list in redis
  def save
    destroy
    REDIS.sadd :players, to_json
  end

  def to_json
    { name: name, score: score, uid: uid }.to_json
  end

  def to_public_json
    { name: name, score: score }.to_json
  end

  def self.players_socket_json
    players = REDIS.smembers(:players)
    players_hash = {}
    players.each do |p|
      json = JSON.parse(p)
      players_hash[json['name']] = { name: json['name'], score: json['score'] }
    end
    { players: players_hash }.to_json
  end
end
