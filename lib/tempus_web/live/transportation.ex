defmodule TempusWeb.TransportationLive do
  use TempusWeb, :live_view

def mount(_params, _session, socket) do
  {:ok, socket
|> assign(:last_position, %{x: 1, y: 1})
}
  
end
  def render(assigns) do
    ~H"""
    <div class="flex p-8 bg-gray-100">
      <!-- Graph Section -->
      <div class="flex-1 bg-white border p-6 mr-4 rounded shadow-lg">
        <div id="chart-container">
          <canvas id="myChart" phx-hook="TransportationGrid" data-starting-position={Jason.encode!(@last_position)}></canvas>
        </div>
      </div>
      <!-- Table Section -->
      <div class="w-2/5 bg-white border p-4 rounded shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Event Based State Transitions</h2>
        <form phx-submit="move">
          <select class="w-auto" name="direction">
            <option value="up">Up</option>
            <option value="down">Down</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>

          <input
            type="number"
            class="w-40"
            name="num_cells"
            min="1"
            max="5"
            placeholder="Number of Cells"
            required="true"
          />

          <.button type="submit">Move</.button>
        </form>

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

  def handle_event("move", %{"direction" => direction, "num_cells" => num_cells}, socket) do
    {:noreply,
     push_event(socket, "move", %{
       direction: direction,
       num_cells: num_cells,
       current_position: %{x: 0, y: 0}
     })}
  end
end
