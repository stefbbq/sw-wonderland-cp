<div class="client_collateral">
  <section class="collateral">
    <div class="util">
      <h1>Uploaded Collateral</h1>
      <form ng-controller="CollateralSearchCtrl" class="search" ng-submit="doSearch()">
        <input type="text" name="search" id="search" placeholder="" ng-model="searchString">
        <input type="submit" value="Search">
      </form>
    </div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>
            Thumb
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
            <a href="javascript:void(0);" ng-click="orderByField='description'; reverseSort = !reverseSort">
            Description
            </a>
          </th>
          <th>
            <a href="javascript:void(0);" ng-click="orderByField='last_upload'; reverseSort = !reverseSort">
            Date Uploaded
            </a>
          </th>
          <th>
            Order Item
          </th>
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="item in ws.collateralList|orderBy:orderByField:reverseSort">
          <td><img src="{{item.thumb_path}}" height="50"></td>
          <td>{{item.name}}</td>
          <td>{{item.type_name}}</td>
          <td>{{item.description}}</td>
          <td>{{item.last_upload}}</td>
          <td><button ng-click="orderItem(item.guid);">order</button></td>
        </tr>
      </tbody>
    </table>  
    
  </section>
  
</div>

