class Question < ActiveRecord::Base

  def to_socket_json
    { question: { category: 'xxx',
                  id: id,
                  question: question,
                  answers: [answer1, answer2, answer3, answer4]
                }
    }.to_json

  end

end
