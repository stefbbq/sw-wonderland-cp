<div class="client_requestQuote">
  <h1>Request Quote</h1>
    <form name="requestQuote" novalidate>
      <ul>
        <li>
          <label for="type">Interested In</label><select id="type" ng-model="quote.type" ng-options="item.id as item.name for item in ws.dropdown.type" ></select>
        </li>
        <li>
          <label for="size">Finished Size</label><input id="size" ng-model="quote.size" type="text">
        </li>
        <li>
          <label for="flatSize">Flat Size</label><input id="flatSize" ng-model="quote.flatSize" type="text">
        </li>
        <li>
          <label for="foldedSize">Finished size if folded ( W x H )</label><input id="foldedSize" ng-model="quote.foldedSize" type="text">
        </li>
        <li>
          <label for="quantity">Quantity</label><input id="quantity" ng-model="quote.quantity" type="text" restrict="0-9">
        </li>
        <li>
          <label for="pageCount">Number of Pages</label><input id="pageCount" ng-model="quote.pageCount" type="text" restrict="0-9">
        </li>
        <li>
          <label for="coatingAQ">Coating AQ</label><select id="coatingAQ" ng-model="quote.coatingAQ" ng-options="item.id as item.name for item in ws.dropdown.coatingAQ"></select>
        </li>
        <li>
          <label for="coatingVarnish">Coating Varnish</label><select id="coatingVarnish" ng-model="quote.coatingVarnish" ng-options="item.id as item.name for item in ws.dropdown.coatingVarnish"></select>
        </li>
        <li>
          <label for="finish">Paper Finish</label><select id="finish" ng-model="quote.finish" ng-options="item.id as item.name for item in ws.dropdown.finish"></select>
        </li>
        <li>
          <label for="weightText">Paper Weight Text</label><select id="weightText" ng-model="quote.weightText" ng-options="item.id as item.name for item in ws.dropdown.weightText"></select>
        </li>
        <li>
          <label for="weightCover">Paper Weight Cover</label><select id="weightCover" ng-model="quote.weightCover" ng-options="item.id as item.name for item in ws.dropdown.weightCover"></select>
        </li>
        <li>
          <label for="recycled">Recycled Opt.</label><select id="recycled" ng-model="quote.recycled" ng-options="item.id as item.name for item in ws.dropdown.recycle"></select>
        </li>
        <li>
          <label for="colours">Ink Colours</label><select id="colours" ng-model="quote.colours" ng-options="item.id as item.name for item in ws.dropdown.colours"></select>
        </li>
        <li>
          <label for="sides">Sides to Print</label><select id="sides" ng-model="quote.sides" ng-options="item.id as item.name for item in ws.dropdown.sides"></select>
        </li>
        <li>
          <label for="specialFX">Special Effects</label><select id="specialFX" ng-model="quote.specialFX" ng-options="item.id as item.name for item in ws.dropdown.sfx"></select>
        </li>
        
        <li>
          <label for="binding">Finish/Binding</label><select id="binding" ng-model="quote.binding" ng-options="item.id as item.name for item in ws.dropdown.binding"></select>
        </li>
        <li>
          <label for="file">Attach File</label><input id="file" ng-model="quote.file" type="file" ng-file-select="onFileSelect($files)">
        </li>
        <li class="description">
          <label for="description">Description</label>
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

