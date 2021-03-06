# [Castle & Chair](https://castleandchair.herokuapp.com/#/listings)

Atsy is an ecommerce website for craft. It is inspired by Etsy. It is built on Rails and PostgreSQL backend with React and Redux frontend.

This project was built within a 10 days timeframe. I do plan on implementing new features on this project over time. Features for planned release:
  1. Search
  2. Categories
  3. User / Profile page
  
  
# Features 

1. Secure frontend to backend user authentication using BCrypt.
2. Logged in user can create/edit/update/delete Listings.
  * Listing is created with a user upload photo attachment.
  * Only authors of listing can edit/delete the listing.
  * view listings by merchant.
3. Logged in user can add listings into personal cart. 
  * Listings in cart remain in cart even after session is signed out / signed in.
  * Cart quantity can be updated. Price in cart recalculates based on listings in cart.
4. User can write reviews on listing.
  * Reviews that belong to a site is displayed on the listing page.

Signup page
![signup](images/signup.png)


Create Listing page
![createlisting](images/create_listing.png)

Cart page
![cart](images/cart.png)

Comment
![comment](images/comment.png)

# Implementations

## 1. Prevent N+1 query

Use Active Record eager loading to prevent N+1 query in the listing index page. In index page, the associations of the listing with attached photos and merchant name is eagery loaded.

![Prevent N+1](images/n+1.png)

## 2. User model validations

Validations to enforce mandatory fields for username and password. Passwords are salted and hashed using BCrypt before it is stored in database. This ensures sensitive data like passwords are not stored as plain text. Besides that, custom error messages is displayed to user if minimum requirement is not met.

![user modal validation](images/user_model_validation.png)

## 3. Search in multiple columns

Search query using wildcard to search for merchant name and listing title across two separate columns. Search query is also made case insensitive to return relevant result.

![search implementation](images/search.png)

## 4. Categories

Each listing can belong to multiple categories. For example, a coffee table can belong to table category and living room category. 


## 5. Reusing components
 
The form component is shared and used for both create listing and edit listing. For create listing, if no existing form props are received, fields are populated with empty fields.
For edit listing, if existing form props are receiving, the fields are pre-populated with existing values.

![component reuseability](images/form_component_reuse.png)
