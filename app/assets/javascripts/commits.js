(function() {
  this.CommitsList = (function() {
    function CommitsList() {}

    CommitsList.timer = null;

    CommitsList.init = function(limit) {
      $("body").on("click", ".day-commits-table li.commit", function(event) {
        if (event.target.nodeName !== "A") {
          location.href = $(this).attr("url");
          e.stopPropagation();
          return false;
        }
      });
      Pager.init(limit, false);
      this.content = $("#commits-list");
      this.searchField = $("#commits-search");
      return this.initSearch();
    };

    CommitsList.initSearch = function() {
      this.timer = null;
      return this.searchField.keyup((function(_this) {
        return function() {
          clearTimeout(_this.timer);
          return _this.timer = setTimeout(_this.filterResults, 500);
        };
      })(this));
    };

    CommitsList.filterResults = function() {
      var commitsUrl, form, search;
      form = $(".commits-search-form");
      search = CommitsList.searchField.val();
      commitsUrl = form.attr("action") + '?' + form.serialize();
      CommitsList.content.fadeTo('fast', 0.5);
      return $.ajax({
        type: "GET",
        url: form.attr("action"),
        data: form.serialize(),
        complete: function() {
          return CommitsList.content.fadeTo('fast', 1.0);
        },
        success: function(data) {
          CommitsList.content.html(data.html);
          return history.replaceState({
            page: commitsUrl
          }, document.title, commitsUrl);
        },
        dataType: "json"
      });
    };

    return CommitsList;

  })();

}).call(this);
