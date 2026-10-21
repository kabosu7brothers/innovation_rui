const SUPERBASE_URL = "https://dlmaujcsjgapzszwxwhf.supabase.co";
const SUPERBASE_KEY = "sb_publishable_yW4Z8TyHfKHhQjV0g7SlnA_QAvBwkdP";

const superbaseClient = window.supabase.createClient(SUPERBASE_URL, SUPERBASE_KEY);

const animalList = document.getElementById("animalList");
const animalForm = document.getElementById("animalForm");
const submitButton = document.getElementById("submitButton");
const message = document.getElementById("message");

// メッセージ表示(成功:緑 / 失敗:赤)、色や大きさはStyle.cssで変更可能
function showMessage(text, isError = false) {
  message.textContent = text;
  message.className = isError ? "error" : "success";
  {

  // 生物データを取得して表示(view.htmlでの処理)
  async function loadAnimals() {
      const { data, error } = await supabaseClient
          .from("rui")
          .delete()
          .eq("id",1)
          .select();

      if (error) {
          console.error(error);
          alert("データを取得できませんでした: " + error.message);
          return;
      }

      animalList.innerHTML = "";

      if(data.length === 0) {
         animalList.textContent = "データが0件です(RLSの設定を確認してください)";
         return;
      }

      data.forEach(animal => {
          const div = document.createElement("div");
          div.className = "animal";

          // textContentを使い、入力された文字がHTMLとして実行されないようにする
          const title = document.createElement("h3");
          title.textContent = animal.name;

          const area = document.createElement("p");
          description.textContent = animal.description ?? "";

          div.append(title, area, description);
          animalList.appendChild(div);
      });
  }

    // 生物データを登録
    async function addAnimal(event) {
        event.preventDefault();

        const name = document.getElementByid("nameInput").value.trim();
        const area = document.getElementByid("areaInput").value.trim();
        const description = document.getElementById("descriptionInput").value.trim();

        if (!name || !area) {
            showMessage("名前")
