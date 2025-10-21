import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, Edit, X } from "lucide-react";

interface Item {
  id: number;
  name: string;
}

const App = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState<string>("");
  useEffect(() => {
    const initialItems: Item[] = [
      { id: 1, name: "Buy Groceries" },
      { id: 2, name: "Setup Frontend" },
      { id: 3, name: "Book mongoDB Course" },
    ];
    setItems(initialItems);
  }, []);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newItemName.trim() === "") return;

    const newItem: Item = {
      id: Date.now(),
      name: newItemName,
    };

    setItems([...items, newItem]);
    setNewItemName("");
  };

  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const startEdit = (item: Item) => {
    setEditingId(item.id);
    setEditingName(item.name);
  };

  const handleUpdate = (id: number) => {
    if (editingName.trim() === "") return;
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, name: editingName.trim() } : item
      )
    );
    setEditingId(null);
    setEditingName("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 md:p-8 mt-10">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
          Local CRUD Simulator (TSX)
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          (Data is saved in browser memory only)
        </p>
        <form onSubmit={handleCreate} className="flex space-x-2 mb-8">
          <input
            type="text"
            placeholder="Add new item name..."
            value={newItemName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewItemName(e.target.value)
            }
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
          />
          <button
            type="submit"
            disabled={!newItemName.trim()}
            className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md flex items-center disabled:opacity-50"
          >
            <Plus size={20} className="mr-1" />
            Add
          </button>
        </form>
        <div className="space-y-3">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 p-4 border border-dashed rounded-lg">
              No Items yet. Add one above!
            </p>
          ) : (
            items.map((item: Item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200"
              >
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEditingName(e.target.value)
                    }
                    className="flex-grow p-2 border border-indigo-400 rounded-md mr-4 focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <span className="text-gray-800 font-medium truncate">
                    {item.name}
                  </span>
                )}
                <div className="flex space-x-2 ml-4">
                  {editingId === item.id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(item.id)}
                        disabled={editingName.trim() === ""}
                        className="p-2 text-white bg-green-500 rounded-full hover:bg-green-600 transition disabled:opacity-50"
                        title="Save Changes"
                      >
                        <Save size={18} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-2 text-white bg-red-500 rounded-full hover:bg-red-600 transition"
                        title="Cancel Edit"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(item)}
                        className="p-2 text-indigo-600 bg-indigo-100 rounded-full hover:bg-indigo-200 transition"
                        title="Edit Item"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 bg-red-100 rounded-full hover:bg-red-200 transition"
                        title="Delete Item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <footer className="mt-10 text-center text-gray-500 text-sm w-full max-w-lg p-4">
        This TypeScript component is fully functional for local CRUD operations.
      </footer>
    </div>
  );
};

export default App;
