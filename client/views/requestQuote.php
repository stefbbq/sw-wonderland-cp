<div class="client_requestQuote details-section">
  <div class="title">Request Quote</div>
    <form name="requestQuote" novalidate>
      <ul>
        <li>
          <div class="input-label" for="type">Interested In</div><select id="type" ng-model="quote.type" ng-options="item.id as item.name for item in ws.dropdown.type" ></select>
        </li>
        <li>
          <div class="input-label" for="size">Finished Size</div><input id="size" ng-model="quote.size" type="text">
        </li>
        <li>
          <div class="input-label" for="flatSize">Flat Size</div><input id="flatSize" ng-model="quote.flatSize" type="text">
        </li>
        <li>
          <div class="input-label" for="foldedSize">Finished size if folded ( W x H )</div><input id="foldedSize" ng-model="quote.foldedSize" type="text">
        </li>
        <li>
          <div class="input-label" for="quantity">Quantity</div><input id="quantity" ng-model="quote.quantity" type="text" restrict="0-9">
        </li>
        <li>
          <div class="input-label" for="pageCount">Number of Pages</div><input id="pageCount" ng-model="quote.pageCount" type="text" restrict="0-9">
        </li>
        <li>
          <div class="input-label" for="coatingAQ">Coating AQ</div><select id="coatingAQ" ng-model="quote.coatingAQ" ng-options="item.id as item.name for item in ws.dropdown.coatingAQ"></select>
        </li>
        <li>
          <div class="input-label" for="coatingVarnish">Coating Varnish</div><select id="coatingVarnish" ng-model="quote.coatingVarnish" ng-options="item.id as item.name for item in ws.dropdown.coatingVarnish"></select>
        </li>
        <li>
          <div class="input-label" for="finish">Paper Finish</div><select id="finish" ng-model="quote.finish" ng-options="item.id as item.name for item in ws.dropdown.finish"></select>
        </li>
        <li>
          <div class="input-label" for="weightText">Paper Weight Text</div><select id="weightText" ng-model="quote.weightText" ng-options="item.id as item.name for item in ws.dropdown.weightText"></select>
        </li>
        <li>
          <div class="input-label" for="weightCover">Paper Weight Cover</div><select id="weightCover" ng-model="quote.weightCover" ng-options="item.id as item.name for item in ws.dropdown.weightCover"></select>
        </li>
        <li>
          <div class="input-label" for="recycled">Recycled Opt.</div><select id="recycled" ng-model="quote.recycled" ng-options="item.id as item.name for item in ws.dropdown.recycle"></select>
        </li>
        <li>
          <div class="input-label" for="colours">Ink Colours</div><select id="colours" ng-model="quote.colours" ng-options="item.id as item.name for item in ws.dropdown.colours"></select>
        </li>
        <li>
          <div class="input-label" for="sides">Sides to Print</div><select id="sides" ng-model="quote.sides" ng-options="item.id as item.name for item in ws.dropdown.sides"></select>
        </li>
        <li>
          <div class="input-label" for="specialFX">Special Effects</div><select id="specialFX" ng-model="quote.specialFX" ng-options="item.id as item.name for item in ws.dropdown.sfx"></select>
        </li>
        
        <li>
          <div class="input-label" for="binding">Finish/Binding</div><select id="binding" ng-model="quote.binding" ng-options="item.id as item.name for item in ws.dropdown.binding"></select>
        </li>
        <li>
          <div class="input-label" for="file">Attach File</div><input id="file" ng-model="quote.file" type="file" ng-file-select="onFileSelect($files)">
        </li>
        <li class="description">
          <div class="input-label" for="description">Description</div>
          <p>(If booklet Please indicate page count including or plus cover)</p>
          <textarea id="description" ng-model="quote.description"></textarea>
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

