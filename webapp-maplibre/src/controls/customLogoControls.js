import logoHonda from "../logo/Honda.png";

export class LogoHondaControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'maplibregl-ctrl';
        
        // Menggunakan backtick (`) murni untuk string multi-baris
        this._container.innerHTML = `
            <img
                src="${logoHonda}"
                alt="Logo Honda"
                style="width: 100px; height: auto;"
            />
        `;
        
        return this._container;
    }

    onRemove() {
        this._container.remove();
        this._map = undefined;
    }
}