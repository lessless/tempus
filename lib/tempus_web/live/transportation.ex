defmodule TempusWeb.TransportationLive do
  use TempusWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign(:current_position, %{x: 1, y: 1})}
  end

  def render(assigns) do
    ~H"""
    <div class="flex p-8 bg-gray-100">
      <!-- Graph Section -->
      <div class="flex-1 bg-white border p-6 mr-4 rounded shadow-lg">
        <div id="chart-container">
          <canvas
            id="myChart"
            phx-hook="TransportationGrid"
            phx-update="ignore"
            data-starting-position={Jason.encode!(@current_position)}
          >
          </canvas>
        </div>
      </div>
      <!-- Table Section -->
      <div class="w-2/5 bg-white border p-4 rounded shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Event Based State Transitions</h2>
        <form phx-submit="moved">
          <select class="w-auto" name="direction">
            <option value="up">Up</option>
            <option value="right">Right</option>
            <option value="down">Down</option>
            <option value="left">Left</option>
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

  def handle_event("moved", %{"direction" => direction, "num_cells" => num_cells}, socket) do
  num_cells = String.to_integer(num_cells)
  updated_position  = new_position(socket.assigns.current_position, direction, num_cells);
    {:noreply,
     socket
     |> push_event("moved", %{
       direction: direction,
       num_cells: num_cells,
       updated_position: updated_position
     })
     |> assign(
       :current_position,
     updated_position
     )}
  end

defp new_position(current_position, "up", num_cells) do
    new_position = clamp_to_zero(current_position.y - num_cells)
    %{x: current_position.x , y: new_position}
  end
  
  defp new_position(current_position, "down", num_cells) do
    new_position = clamp_to_zero(current_position.y + num_cells)
    %{x: current_position.x , y: new_position}
  end
  
  defp new_position(current_position, "left", num_cells) do
    new_position = clamp_to_zero(current_position.x - num_cells)
    %{x: new_position , y: current_position.y}
  end
  
  defp new_position(current_position, "right", num_cells) do
    new_position = clamp_to_zero(current_position.x + num_cells)
    %{x: new_position , y: current_position.y}
  end

  defp clamp_to_zero(position) do
    if position >= 0 do
      position
    else
      0
    end
  end
end
