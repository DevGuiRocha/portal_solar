class CreateSimulations < ActiveRecord::Migration[7.0]
  def change
    create_table :simulations do |t|
      t.references :client, null: false, foreign_key: true
      t.float :bill_value
      t.text :recommended_generators
      t.string :pdf

      t.timestamps
    end
  end
end
