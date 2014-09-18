<div class="client_requestQuote">
  <h1>Request Quote</h1>
    <form name="requestQuote" novalidate>
      <ul>
        <li>
          <label for="type">Interested In</label><select id="type" ng-model="quote.type" ng-options="item.id as item.name for item in ws.dd.type" ></select>
        </li>
        <li>
          <label for="size">Finished Size</label><input id="size" ng-model="quote.size" type="text">
        </li>
        <li>
          <label for="quantity">Quantity</label><input id="quantity" ng-model="quote.quantity" type="text" restrict="0-9">
        </li>
        <li>
          <label for="pageCount">Number of Pages</label><input id="pageCount" ng-model="quote.pageCount" type="text" restrict="0-9">
        </li>
        <li>
          <label for="finish">Paper Finish</label><select id="finish" ng-model="quote.finish" ng-options="item.id as item.name for item in ws.dd.finish"></select>
        </li>
        <li>
          <label for="weight">Paper Weight</label><select id="weight" ng-model="quote.weight" ng-options="item.id as item.name for item in ws.dd.weight"></select>
        </li>
        <li>
          <label for="recycled">Recycled Opt.</label><select id="recycled" ng-model="quote.recycled" ng-options="item.id as item.name for item in ws.dd.recycle"></select>
        </li>
        <li>
          <label for="colours">Ink Colours</label><select id="colours" ng-model="quote.colours" ng-options="item.id as item.name for item in ws.dd.colours"></select>
        </li>
        <li>
          <label for="sides">Sites to Print</label><input type="text" id="sides" ng-model="quote.sides" >
        </li>
        <li>
          <label for="specialFX">Special Effects</label><select id="specialFX" ng-model="quote.specialFX" ng-options="item.id as item.name for item in ws.dd.sfx"></select>
        </li>
        
        <li>
          <label for="binding">Finish/Binding</label><select id="binding" ng-model="quote.binding" ng-options="item.id as item.name for item in ws.dd.binding"></select>
        </li>
        <li>
          <label for="file">Attach File</label><input id="file" ng-model="quote.file" type="file" ng-file-select="onFileSelect($files)">
        </li>
        <li class="description">
          <label for="description">Description</label><textarea id="description" ng-model="quote.description"></textarea>
        </li>
        <li class="buttons">
          <button ng-disabled="requestQuote.$invalid" ng-click="submit(quote);">Submit</button>
          <button ng-click="autoFill();">Auto-Fill</button>
        </li>
      </ul>
      
    </form>
    <!--
    <pre>
      {{quote}}
    </pre>
    -->
    <!--
    <pre id="server_response"</pre>
    -->
  </div>
</div>

