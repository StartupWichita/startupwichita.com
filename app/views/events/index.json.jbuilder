json.array!(@events) do |event|
  json.extract! event, :id, :startTime, :endTime, :address
  json.url event_url(event, format: :json)
end
