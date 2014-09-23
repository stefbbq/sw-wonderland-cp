<div class="client_orderCollateral details-section">
  <div class="section-title">Order Request</div>
  <div class="title">Collateral Details</div>
  <div class="collateral-details details-section">
    <table class="list selectable">
      <tr class="vertical header">
        <th>Name 
        <td>{{ws.collateral.name}}  
      <tr class="vertical header">
        <th>Last Upload 
        <td>{{ws.collateral.last_upload}}  
      <tr class="vertical header">
        <th>Type 
        <td>{{ws.collateral.type_name}}  
      <tr class="vertical header">
        <th>Description 
        <td>{{ws.collateral.description}}  
      <tr class="vertical header">
        <th>Thumbnail 
        <td><a href="{{ws.collateral.thumb_path}}"><img ng-src="{{ws.collateral.thumb_path}}" height="100"></a>
    </table>
  </div><!-- end .collateral-details -->
  
  <div class="details-section order-collateral">
    <div class="title">Order Details</div>
    <div class="label intro-copy">To reorder this order, please complete the fields below and submit.</div>
    <form name="reorderForm" novalidate>
      <div class="field-group">
        <div class="input-label label" for="quantity">Quantity</div>
        <input id="quantity" type="text" ng-model="order.quantity" required only-digits>
      </div>
      <div class="field-group">
        <div class="input-label label" for="comment">Special Requests</div>
        <textarea id="comment" ng-model="order.comment"></textarea>
      </div>
      
      <div class="button-row">
        <button ng-click="cancel();">Cancel</button>
        <button ng-disabled="!reorderForm.$valid" ng-click="submitOrder();">Submit</button>
      </div>
    </form>
  </div><!-- end .details-section -->

  
</div><!-- end .details-section --> 

