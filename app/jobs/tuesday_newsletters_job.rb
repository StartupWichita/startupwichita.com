class TuesdayNewslettersJob < ActiveJob::Base
  queue_as :default

  def perform(*args)
    # Do something later
    TuesdayMailer.send_newsletters
  end
end
