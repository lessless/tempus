defmodule TempusWeb.SampleLive do
  use TempusWeb, :live_view
  
  
def render(assigns) do
  ~H"""
  <div class="flex p-8 bg-gray-100">
     <!-- Graph Section -->
     <div class="flex-1 bg-white border p-6 mr-4 rounded shadow-lg">
        <div id="chart-container"  >
            <canvas id="myChart" phx-hook="NavigationGrid"></canvas>
        </div>
         
       
     </div>
     
     <!-- Table Section -->
     <div class="w-1/4 bg-white border p-4 rounded shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Event Based State Transitions</h2>
        <table class="w-full">
           <thead>
              <tr class="border-b">
                 <th class="pb-2">Name</th>
                 <th class="pb-2">Direction</th>
                 <th class="pb-2">Transaction Time</th>
              </tr>
           </thead>
           <tbody>
              <tr class="border-b">
                 <td>Stephen</td>
                 <td><span class="bg-blue-500 text-white px-2 py-1 rounded">↓x5</span></td>
                 <td>T1</td>
              </tr>
              <!-- Add other rows similarly -->
           </tbody>
        </table>
     </div>
  </div>

  """
  end
end