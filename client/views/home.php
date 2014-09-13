<div class="client_home">
<!--
  <section class="company_detail" ng-controller="CompanyInfoController">
    <h1>{{ws.company.name}}</h1>
    <p>{{ws.company.address}}<br/>
    {{ws.company.city}}, {{ws.company.province}}  {{ws.company.postal_code}}<br/>
    {{ws.company.country}}<br/>
    {{ws.company.phone | tel}}<br/>
    {{ws.company.phone2 | tel}}<br/>
    </p>
  </section>
  -->

  <section class="latest_news">
    <h1>Latest News</h1>
    <p>Latest news would go here.  Will need to determine where this resides in the database.  Likely pulling it from the Expression Engine DB.</p>
  </section>

  <br/>
  <br/>
  <section class="order_history">
    <div class="util">
      <h1>Order History</h1>
      <form ng-controller="OrderHistorySearchCtrl" class="search" ng-submit="doSearch()">
        <input type="text" name="search" id="search" placeholder="" ng-model="searchString">
        <input type="submit" value="Search">
      </form>
    </div>
    <table class="table table-bordered">
      <thead>
        <tr>
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
        <tr ng-repeat="item in ws.orderHistory|orderBy:orderByField:reverseSort">
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

