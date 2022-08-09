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

puts 'seeding test user'


20.times { |index| 
    User.create!(username: "testbot#{index}", password: 'testword', summoner_name: "testsummoner#{index}")
}

puts 'seeding test posts'

10.times {|index| 
    Post.create!(title: "#{index}", description: "big test stuff #{index}", video: "coming soon", user_id: index+1 )
}

puts 'seeding comments'

20.times { |i| 
    5.times {|j|
        Comment.create!(text: "test comment ##{j+1} by user #{i+1}", user_id: i+1, post_id: rand(1..10))
    }
}

puts 'seeding votes'

20.times { |i|
    5.times {|j|
        x = (rand() < 0.5)? 1: -1
        Vote.create!(user_id: i+1, post_id: rand(1..10), value: x)
    }
}

puts 'done'