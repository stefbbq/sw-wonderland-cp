<div class="client_orderCollateral">
  <h1>Order Request</h1>
  <h2>Collateral Details</h2>
  <div class="collateral-details">
    <img src="{{ws.collateral.thumb_path}}" width="100">
    <div class="info">
      <p>{{ws.collateral.name}}</p>
      <p>{{ws.collateral.type_name}}</p>
      <p>{{ws.collateral.description}}</p>
      <p>{{ws.collateral.last_upload}}</p>
    </div>
  </div>
  
  <h2>Order Details</h2>
  <p>To reorder this order, please complete the fields below and submit.</p>
  <form name="reorderForm" novalidate>
    <div class="field-group">
      <label for="quantity">Quantity</label>
      <input id="quantity" type="text" ng-model="order.quantity" required only-digits>
    </div>
    <div class="field-group">
      <label for="comment">Special Requests</label>
      <textarea id="comment" ng-model="order.comment"></textarea>
    </div>
    
    <div class="button-row">
      <button ng-click="cancel();">Cancel</button>
      <button ng-disabled="!reorderForm.$valid" ng-click="submitOrder();">Submit</button>
    </div>
  </form>
  
</div>

