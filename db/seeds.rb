# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create({username: 'demouser', password: 'starwars', merchant_name: 'Atsy'})
User.create({username: 'kee', password: 'starwars', merchant_name: 'Castle and Chair'})
User.create({username: 'amazon', password: 'starwars', merchant_name: 'Amazon' })
User.create({username: 'john', password: 'starwars'})
User.create({username: 'mei', password: 'starwars', merchant_name: 'South East Elm'})
User.create({username: 'wayfair', password: 'starwars', merchant_name: 'Wayfair'})
User.create({username: 'guest', password: 'starwars'})

Listing.create({title: "Wedding Veil",description: "An Etsy Best Seller!!

Free Lace Garter with every Veil Purchase as My Gift to You!

This elegant wedding veil is so classic and timeless. It is made with
very soft bridal illusion tulle, allowing your dress to shine through.
It is single layer and 108 in width. This veil comes sewn to a metal comb and has a perfect cut raw, rounded edge.",
author_id: "2" , modified_by_userid: "2", price: "25" , overview: "Handmade item
Material: bridal illusion
Made to order
Favorited by: 6729 people
Gift message available" })
