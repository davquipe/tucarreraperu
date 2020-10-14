import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VocationalTestService {

  constructor(
    private http: HttpClient
  ) { }

  crearParticipante(participante :any) {
    return this.http.post(`${base_url}/usuarios`, participante);
  }

  cargarPreguntas() {
    return this.http.get(`${base_url}/preguntas`);
  };

  // Crear nueva pregunta
  crearPregunta(pregunta: any) {
    console.log(pregunta);
    const formData: any = new FormData();
    formData.append('pregunta', pregunta.pregunta);
    formData.append('img', pregunta.img);
    return this.http.post(`${base_url}/preguntas`, formData);
  }

  actualizarPregunta(id: string, pregunta: any) {
    return this.http.put(`${base_url}/preguntas/${id}`, pregunta);
  }
}
