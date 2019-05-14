json.array! @messages do |message|
  json.content message.content
  json.image message.image
  json.user_name message.user.name
  json.group_id message.group.id
  json.created_at message.created_at.to_s
  json.id message.id
end