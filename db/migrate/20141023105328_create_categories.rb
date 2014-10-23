class CreateCategories < ActiveRecord::Migration

  def change

    create_table :categories do |t|
      t.string :name
      t.string :icon
      t.text :description
      t.timestamps
    end

    add_column :questions, :category_id, :integer

  end

end
