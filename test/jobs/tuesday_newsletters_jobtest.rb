require 'test_helper'
class TuesdayNewslettersJobTest < ActiveJob::TestCase
    test 'that newsletter can be sent to Tuesday Readers' do
        TuesdayNewslettersJob.perform_now
    end
end