<div class="client_requestQuote details-section">
  <div class="title">Request Quote</div>
    <form name="requestQuote" novalidate>
      <ul>
        <li>
          <label for="quantity">Quantity</label><input id="quantity" ng-model="quote.quantity" type="text" restrict="0-9">
        </li>
        <li class="textArea">
          <label for="description">Description</label><p>(If booklet Please indicate page count including or plus cover)</p><textarea id="description" ng-model="quote.description"></textarea>
        </li>
        <li>
          <label for="flatSize">Flat Size</label><input id="flatSize" ng-model="quote.flatSize" type="text">
        </li>
        <li>
          <label for="foldedSize">Finished size if folded ( W x H )</label><input id="foldedSize" ng-model="quote.foldedSize" type="text">
        </li>
        <li>
          <label for="sides">Sides to Print</label><select id="sides" ng-model="quote.sides" ng-options="item.code as item.name for item in ws.dropdown.sides"></select>
        </li>
        <li>
          <label for="ink">Ink</label><select id="ink" ng-model="quote.ink" ng-options="item.code as item.name for item in ws.dropdown.ink"></select>
        </li>
        <li>
          <label for="coatingAQ">Coating AQ</label><select id="coatingAQ" ng-model="quote.coatingAQ" ng-options="item.code as item.name for item in ws.dropdown.coatingAQ"></select>
        </li>
        <li>
          <label for="coatingVarnish">Coating Varnish</label><select id="coatingVarnish" ng-model="quote.coatingVarnish" ng-options="item.code as item.name for item in ws.dropdown.coatingVarnish"></select>
        </li>
        <li>
          <label for="weightText">Paper Weight Text</label><select id="weightText" ng-model="quote.weightText" ng-options="item.code as item.name for item in ws.dropdown.weightText"></select>
        </li>
        <li>
          <label for="weightCover">Paper Weight Cover</label><select id="weightCover" ng-model="quote.weightCover" ng-options="item.code as item.name for item in ws.dropdown.weightCover"></select>
        </li>
        <li>
          <label for="paperFinish">Paper Finish</label><select id="paperFinish" ng-model="quote.paperFinish" ng-options="item.code as item.name for item in ws.dropdown.paperFinish"></select>
        </li>
        <li>
          <label for="finishing">Finishing</label><select id="finishing" ng-model="quote.finishing" ng-options="item.code as item.name for item in ws.dropdown.finishing"></select>
        </li>
        <li class="textArea">
          <label for="finishingReq">Other Finishing Requirements</label><p>Please specify</p><textarea id="finishingReq" ng-model="quote.finishingReq"></textarea>
        </li>
        <li class="textArea">
          <label for="specialInstructions">Special Instructions</label><textarea id="specialInstructions" ng-model="quote.specialInstructions"></textarea>
        </li>
        <li>
          <label for="file">Attach File</label><input id="file" ng-model="quote.file" type="file" ng-file-select="onFileSelect($files)">
        </li>
        <li class="buttons">
          <button ng-disabled="requestQuote.$invalid" ng-click="submit();">Submit</button>
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

