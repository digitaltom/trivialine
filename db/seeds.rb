# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

seeds = YAML.load(File.open(File.join(Rails.root, 'config', 'questions.yml')))

seeds['categories'].each do  |cat|
  Category.find_or_create_by(name: cat)
end

seeds['questions'].each do  |question|
  Question.find_or_create_by(question: question['question'],
                  answer1: question['answer1'],
                  answer2: question['answer2'],
                  answer3: question['answer3'],
                  answer4: question['answer4'],
                  solution: question['solution'],
                  category_id: Category.find_by(name: question['category']).id)
end


