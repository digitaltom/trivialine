class Question < ActiveRecord::Base

  belongs_to :category
  validates_presence_of :category

  def self.random
    order('RANDOM()').first
  end

  def to_socket_json
    { question: { category: category.name,
                  id: id,
                  question: question,
                  answers: [{ answer: answer1, id: 1 },
                            { answer: answer2, id: 2 },
                            { answer: answer3, id: 3 },
                            { answer: answer4, id: 4 }]
                }
    }.to_json
  end
end
