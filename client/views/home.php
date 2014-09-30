<div class="client_home">

  <section class="latest_news details-section">
    <div class="title">Latest News</div>
    <!-- <div class="news-container">{{ws.latestNews.news}}</div> -->
    <div class="news-container" ng-bind-html="ws.latestNews.news"></div>

  </section>

  <br/>
  <br/>
  <section class="order_history details-section">
    <div class="util">
      <div class="title">Order History</div>
      <div class="right">
        <div class="label">Search</div>
        <form ng-controller="OrderHistorySearchCtrl" class="search" ng-submit="doSearch()">
          <input type="text" name="search" id="search" class="search" placeholder="" ng-model="searchString">
          <input type="submit" value="Search">
        </form>
      </div><!-- end .right -->
      <div class="clear"></div>
    </div><!-- end .util -->

    <table class="table table-bordered list selectable">
      <thead>
        <tr class="header">
          <th>
            Collateral Thumb
          </th>
          <th>
            <a href="javascript:void(0);" ng-click="orderByField='name'; reverseSort = !reverseSort">
              Collateral Name
            </a>
          </th>
          <th>
            <a href="javascript:void(0);" ng-click="orderByField='type'; reverseSort = !reverseSort">
            Collateral Type
            </a>
          </th>
          <th>
            <a href="javascript:void(0);" ng-click="orderByField='quantity'; reverseSort = !reverseSort">
            Quantity
            </a>
          </th>
          <th>
            <a href="javascript:void(0);" ng-click="orderByField='order_date'; reverseSort = !reverseSort">
            Order Date
            </a>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="item in ws.orderHistory|orderBy:orderByField:reverseSort" class="record">
          
          <td><img src="{{item.thumb_path}}" height="50"></td>
          <td>{{item.name}}</td>
          <td>{{item.type_name}}</td>
          <td>{{item.quantity}}</td>
          <td>{{item.order_date}}</td>
        </tr>
      </tbody>
    </table>  
    
  </section>
  
  
</div>
