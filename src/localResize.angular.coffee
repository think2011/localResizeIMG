do ->
  app = angular.module 'localResizeIMG', []

  app.directive 'lRImg', ->
    return {
      restrict: 'E'
      scope:
        ngModel: '='
        change : '='
        success: '='
        reset  : '='
        title  : '@'
      link: (scope, element, attrs) ->
        # 获取传参
        rWidth   = attrs.rwidth
        quality  = attrs.quality
        readonly = attrs.readonly isnt undefined
        quality  = attrs.quality
        UI       = attrs.ui or attrs.UI


        # 生成元素
        lr = new LocalResize element[0],
          rWidth  : rWidth
          quality : quality
          readonly: readonly
          quality : quality
          UI      : UI

        # 设置标题
        scope.$watch 'title', (newVal) ->
          lr.UI.setTitle newVal

        # view to model
        lr
        .change (data) ->
          if typeof scope.change is 'function' then scope.change data

        .success (setStop, data) ->
          scope.$apply -> scope.ngModel = data

          if typeof scope.success is 'function' then scope.success setStop, data

        .reset = ->
          scope.$apply -> scope.ngModel = {}

          lr.UI.reset()

          if typeof scope.reset is 'function' then scope.reset()
          return lr

        # model to view
        scope.$watch 'ngModel', (newVal) ->
          if newVal?.imgUrl
            if readonly then lr.setImgOnly newVal.imgUrl else lr.setImg newVal.imgUrl
    }