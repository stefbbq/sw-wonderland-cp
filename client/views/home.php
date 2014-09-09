<div class="client_home">
  <section class="company_detail">
    <h1>{{ws.company.name}}</h1>
    <p>{{ws.company.address}}<br/>
    {{ws.company.city}}, {{ws.company.province}}  {{ws.company.postal_code}}<br/>
    {{ws.company.country}}<br/>
    {{ws.company.phone | tel}}<br/>
    {{ws.company.phone2 | tel}}<br/>
    </p>
  </section>
  
  <br/>
  <br/>
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
    
  </section>
  
  
</div>

