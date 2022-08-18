# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)




puts 'seeding tags'

Tag.create!(name: 'top')
Tag.create!(name: 'mid')
Tag.create!(name: 'jungle')
Tag.create!(name: 'adc')
Tag.create!(name: 'support')

Tag.create!(name: 'teamfight')
Tag.create!(name: 'outplay')
Tag.create!(name: 'funny')
Tag.create!(name: 'gank')
Tag.create!(name: 'fed')

Tag.create!(name: '1vX')
Tag.create!(name: '1v1')

Tag.create!(name: 'bot')
