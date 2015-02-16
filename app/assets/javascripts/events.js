$(function() {
  $('#event_tag_list').select2({
    tags:[],
    tokenSeparators: [",", " "],
    allowClear: true,
    createSearchChoice: function (term, data) {
      return { id: term, text: term };
    },
    ajax: {
      url: '/topics/tags',
      dataType: 'json',
      delay: 250,
      data: function (params) {
        return { q: params, page: 1 };
      },
      results: function (data, page) {
        return {
          results: $.map(data, function (item) {
            return { id: item, text: item };
          })
        };
      },
      cache: true
    },
    minimumInputLength: 1,
    initSelection: function (element, callback) {
      var data = $.map($(element).val().split(","), function (tag) {
        return { id: tag.trim(), text: tag.trim() };
      });
      callback($.unique(data));
    }
  });
});
