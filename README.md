## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index :name|
|email|string|null: false, unique: true|
|password|string|null: false,|

### Association
- has_many :massages
- has_many :members
- has_many :groups, through: :members


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

has_many :massages
has_many :members
has_many :users, through: :members


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|reference|null: false, foreign_key: true|
|user_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

