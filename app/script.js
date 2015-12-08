angular.module('Eggly', [

])
  .controller('MainCtrl', function ($scope) {
      $scope.categories = [
          {"id": 0, "name": "Development"},
          {"id": 1, "name": "Design"},
          {"id": 2, "name": "Tech News"},
          {"id": 3, "name": "Humor"}
      ];

      $scope.bookmarks = [
          {"id": 0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development" },
          {"id": 1, "title": "Ancestry Standards Site", "url": "http://www.ancestry.com/cs/standards/home", "category": "Development" },
          {"id": 2, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design" },
          {"id": 3, "title": "Free Textures", "url": "http://subtlepatterns.com/", "category": "Design" },
          {"id": 4, "title": "Edge’s JS engine to go open-source", "url": "https://blogs.windows.com/msedgedev/2015/12/05/open-source-chakra-core/", "category": "Tech News" },
          {"id": 5, "title": "Sketch is gone", "url": "http://www.engadget.com/2015/12/02/bohemian-coding-sketch-no-mac-app-store/", "category": "Tech News" },
          {"id": 6, "title": "The Beach Boys Shred I Get Around", "url": "https://www.youtube.com/watch?v=xYc4DT18EJg", "category": "Humor" },
          {"id": 7, "title": "IE Greatness", "url": "https://files.slack.com/files-pri/T02563LQP-F0FPG8CMN/pasted_image_at_2015_12_02_01_31_pm.png", "category": "Humor" },
          {"id": 8, "title": "The Desktop Computer", "url": "https://www.youtube.com/watch?v=Z_mys1Ip6dY", "category": "Humor" }
      ];

      $scope.isCreating = false;
      $scope.isEditing = false;
      $scope.currentCategory = null;
      $scope.editedBookmark = null;

      function isCurrentCategory(category) {
          return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
      }

      function setCurrentCategory(category) {
          $scope.currentCategory = category;

          cancelCreating();
          cancelEditing();
      }

      $scope.isCurrentCategory = isCurrentCategory;
      $scope.setCurrentCategory = setCurrentCategory;

      function setEditedBookmark(bookmark) {
          $scope.editedBookmark = angular.copy(bookmark);
      }

      function isSelectedBookmark(bookmarkId) {
          return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkId;
      }

      $scope.setEditedBookmark = setEditedBookmark;
      $scope.isSelectedBookmark = isSelectedBookmark;

      function resetCreateForm() {
          $scope.newBookmark = {
              title: '',
              url: '',
              category: $scope.currentCategory.name
          };
      }

      //-------------------------------------------------------------------------------------------------
      // CRUD
      //-------------------------------------------------------------------------------------------------
      function createBookmark(bookmark) {
          bookmark.id = $scope.bookmarks.length;
          $scope.bookmarks.push(bookmark);

          resetCreateForm();
      }

      function updateBookmark(bookmark) {
          var index = _.findIndex($scope.bookmarks, function (b) {
              return b.id == bookmark.id
          });
          $scope.bookmarks[index] = bookmark;

          $scope.editedBookmark = null;
          $scope.isEditing = false;
      }

      function deleteBookmark(bookmark) {
          _.remove($scope.bookmarks, function (b) {
              return b.id == bookmark.id;
          });
      }

      $scope.createBookmark = createBookmark;
      $scope.updateBookmark = updateBookmark;
      $scope.deleteBookmark = deleteBookmark;

      //-------------------------------------------------------------------------------------------------
      // CREATING AND EDITING STATES
      //-------------------------------------------------------------------------------------------------
      function shouldShowCreating() {
          return $scope.currentCategory && !$scope.isEditing;
      }

      function startCreating() {
          $scope.isCreating = true;
          $scope.isEditing = false;
          resetCreateForm();
      }

      function cancelCreating() {
          $scope.isCreating = false;
      }

      $scope.shouldShowCreating = shouldShowCreating;
      $scope.startCreating = startCreating;
      $scope.cancelCreating = cancelCreating;

      function shouldShowEditing() {
          return $scope.isEditing && !$scope.isCreating;
      }

      function startEditing() {
          $scope.isCreating = false;
          $scope.isEditing = true;
      }

      function cancelEditing() {
          $scope.isEditing = false;
          $scope.editedBookmark = null;
      }

      $scope.startEditing = startEditing;
      $scope.cancelEditing = cancelEditing;
      $scope.shouldShowEditing = shouldShowEditing;
  })
;
