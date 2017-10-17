namespace :events do
  task :meetup => :environment do
    require 'meetup_client'

    # -------
    # https://github.com/cranieri/meetup_client
    # -------

    def create_new_event(event)
      record = Event.create(
        title: event['name'],
        content: event['description'],
        url: event['event_url'],
        starts_at: get_starts_at(event['time']),
        ends_at: get_ends_at(event['time'], event['duration']),
        address: format_address(event['venue']),
        user_id: ENV['RAKE_EVENTS_OWNER_ID'])

      if record.persisted?
        puts "Created! -- #{record.title} (#{record.id})"
      else
        puts "Error creating! -- #{record.errors.full_messages.to_sentence}"
      end
    end

    def update_existing_event(event)
      record = Event.where(url: event['event_url']).first
      return if record.user_id && record.user_id != ENV['RAKE_EVENTS_OWNER_ID'].to_i

      record.title = event['name']
      record.content = event['description']
      record.url = event['event_url']
      record.starts_at = get_starts_at(event['time'])
      record.ends_at = get_ends_at(event['time'], event['duration'])
      record.address = format_address(event['venue'])
      record.user_id = ENV['RAKE_EVENTS_OWNER_ID']

      if record.save
        puts "Updated! -- #{record.title} (#{record.id})"
      else
        puts "Error updating! -- (#{record.id}) -- #{record.errors.full_messages.to_sentence}"
      end
    end

    def get_and_load_events(event_sources)
      meetup_api = MeetupApi.new
      two_months_from_now = (Time.now + 2.months).to_i

      event_sources.each do |source|
        response = meetup_api.events(
          group_urlname: source,
          status: 'upcoming'
        )

        response['results'].each do |event|
          next if event['time'] > two_months_from_now
          next if duplicate_from_other_group(event)
          event_exists(event) ? update_existing_event(event) : create_new_event(event)
        end
      end
    end

    def event_exists(event)
      Event.where(url: event['event_url']).any?
    end

    def duplicate_from_other_group(event)
      events = Event.where(
        title: event['name'],
        starts_at: get_starts_at(event['time']))

      events.count > 0
    end

    def format_address(venue)
      return "TBD" if !venue

      result = ""
      result << "#{venue['name']}, " unless venue['name'].empty?
      result << "#{venue['address_1']}, "
      result << "#{venue['city']}, "
      result << "#{venue['state']}"
      result << " #{venue['zip']}"
      result
    end

    def get_starts_at(time)
      Time.at(time / 1000) - 6.hours
    end

    def get_ends_at(time, duration)
      duration ? Time.at((time + duration)/1000) - 6.hours : Time.at(time/1000) - 6.hours
    end

    # --------------------
    # DO THINGS!
    # --------------------
    event_sources = ENV['MEETUP_EVENT_SOURCES'].split(',')
    get_and_load_events(event_sources)
  end
end
