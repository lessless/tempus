defmodule Tempus.Repo do
  use Ecto.Repo,
    otp_app: :tempus,
    adapter: Ecto.Adapters.Postgres
end
