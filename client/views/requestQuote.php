<div class="client_requestQuote details-section">
  <div class="title">Request Quote</div>
    <form name="requestQuote" novalidate>
      <ul>
        <li>
          <div class="input-label" for="type">Interested In</div><div class="drop-down"></div><select id="type" ng-model="quote.type" ng-options="item.id as item.name for item in ws.dd.type" ></select>
        </li>
        <li>
          <div class="input-label" for="size">Finished Size</div><input id="size" ng-model="quote.size" type="text">
        </li>
        <li>
          <div class="input-label" for="quantity">Quantity</div><input id="quantity" ng-model="quote.quantity" type="text" restrict="0-9">
        </li>
        <li>
          <div class="input-label" for="pageCount">Number of Pages</div><input id="pageCount" ng-model="quote.pageCount" type="text" restrict="0-9">
        </li>
        <li>
          <div class="input-label" for="finish">Paper Finish</div><div class="drop-down"></div><select id="finish" ng-model="quote.finish" ng-options="item.id as item.name for item in ws.dd.finish"></select>
        </li>
        <li>
          <div class="input-label" for="weight">Paper Weight</div><div class="drop-down"></div><select id="weight" ng-model="quote.weight" ng-options="item.id as item.name for item in ws.dd.weight"></select>
        </li>
        <li>
          <div class="input-label" for="recycled">Recycled Opt.</div><div class="drop-down"></div><select id="recycled" ng-model="quote.recycled" ng-options="item.id as item.name for item in ws.dd.recycle"></select>
        </li>
        <li>
          <div class="input-label" for="colours">Ink Colours</div><div class="drop-down"></div><select id="colours" ng-model="quote.colours" ng-options="item.id as item.name for item in ws.dd.colours"></select>
        </li>
        <li>
          <div class="input-label" for="sides">Sites to Print</div><input type="text" id="sides" ng-model="quote.sides" >
        </li>
        <li>
          <div class="input-label" for="specialFX">Special Effects</div><div class="drop-down"></div><select id="specialFX" ng-model="quote.specialFX" ng-options="item.id as item.name for item in ws.dd.sfx"></select>
        </li>
        
        <li>
          <div class="input-label" for="binding">Finish/Binding</div><div class="drop-down"></div><select id="binding" ng-model="quote.binding" ng-options="item.id as item.name for item in ws.dd.binding"></select>
        </li>
        <li>
          <div class="input-label" for="file">Attach File</div><input id="file" ng-model="quote.file" type="file" ng-file-select="onFileSelect($files)">
        </li>
        <li class="description">
          <div class="input-label" for="description">Description</div><textarea id="description" ng-model="quote.description"></textarea>
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