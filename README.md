# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false, index: true|
|name|string|null: false|
### Association
- has_many :messages
  has_many :groups, through: :members has_many :members

##groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null:false|

### Association
has_many:users, through: :members has_many :messages has_many :members

##members table
|Column|Type|Options|
|------|----|-------|
|user_id|interger|null:false,foreign_key:true|
|group_id|integer|null: false, foreign_key: true|

### Association
belongs_to :group
belongs_to :user


## messageテーブル
|Column|Type|Options|
|------|----|-------|
|image|string||
|body|text|null:false|
|user_id |integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
belongs_to :group belongs_to :user