class MapElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 500px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      </style>
      <div id="map"></div>
    `;
    this.map = new google.maps.Map(this.shadowRoot.querySelector("#map"), {
      center: { lat: 0, lng: 0 },
      zoom: 2,
    });
    this.markers = [
      // Cardinal Directions
      { lat: 90, lng: 0, title: "North" },
      { lat: -90, lng: 0, title: "South" },
      { lat: 0, lng: 180, title: "East" },
      { lat: 0, lng: -180, title: "West" },
      
      // Peninsulas
      { lat: 45.4643, lng: 9.1899, title: "Italian Peninsula" },
      { lat: 40.4637, lng: -3.7492, title: "Iberian Peninsula" },
      { lat: 39.7673, lng: -8.8086, title: "Iberian Peninsula" },
      { lat: 30.0561, lng: 31.2457, title: "Arabian Peninsula" },
      
      // Ring of Fire
      { lat: 38.3219, lng: -122.0842, title: "San Andreas Fault, USA" },
      { lat: 34.0522, lng: -118.2437, title: "Los Angeles, USA" },
      { lat: 35.6895, lng: 139.7670, title: "Tokyo, Japan" },
      { lat: -37.7749, lng: 175.6899, title: "Wellington, New Zealand" },
      
      // Other geographical features
      { lat: 0, lng: 0, title: "Prime Meridian" },
      { lat: 23.5, lng: 0, title: "Tropic of Cancer" },
      { lat: -23.5, lng: 0, title: "Tropic of Capricorn" },
      { lat: 66.5, lng: 0, title: "Arctic Circle" },
      { lat: -66.5, lng: 0, title: "Antarctic Circle" },
    ];
    this.renderMarkers();
  }

  renderMarkers() {
    this.markers.forEach((marker) => {
      new google.maps.Marker({
        position: { lat: marker.lat, lng: marker.lng },
        map: this.map,
        title: marker.title,
      });
    });
  }
}
class ToDoList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li {
          padding: 10px;
          border-bottom: 1px solid #ccc;
        }
        li:last-child {
          border-bottom: none;
        }
      </style>
      <ul></ul>
      <input type="text" placeholder="Add item">
      <button>Add</button>
    `;
    this.items = [];
    this.shadowRoot.querySelector("button").addEventListener("click", () => {
      const input = this.shadowRoot.querySelector("input");
      const item = input.value.trim();
      if (item) {
        this.items.push(item);
        this.renderList();
        input.value = "";
      }
    });
    this.shadowRoot.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        const index = this.items.indexOf(event.target.textContent);
        this.items.splice(index, 1);
        this.renderList();
      }
    });
  }

  renderList() {
    const list = this.shadowRoot.querySelector("ul");
    list.innerHTML = "";
    this.items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
  }
}
class WeatherElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      </style>
      <h2>Current Weather</h2>
      <p id="current-weather"></p>
    `;
    this.location = this.getAttribute("location");
    this.fetchWeatherData();
  }

  fetchWeatherData() {
    if (this.location) {
      fetch(`http://wttr.in/${this.location}?format=3`)
        .then(response => response.text())
        .then(data => {
          this.renderCurrentWeather(data);
        });
    } else {
      console.error("Location attribute is required");
    }
  }

  renderCurrentWeather(data) {
    const currentWeather = this.shadowRoot.querySelector("#current-weather");
    currentWeather.textContent = data;
  }
}
customElements.define("weather", WeatherElement);
customElements.define("todo-list", ToDoList);
customElements.define("map", MapElement);
