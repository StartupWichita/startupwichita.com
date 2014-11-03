json.array!(@events) do |event|
  json.extract! event, :id, :starts_at, :ends_at, :address
  json.url event_url(event, format: :json)
end
