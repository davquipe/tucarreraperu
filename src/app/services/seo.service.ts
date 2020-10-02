import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private meta: Meta,
    private tilte: Title
  ) { }

  generateTags(config?) {
    config = {
      title: 'Test vocacional - Tu Carrerra Perú',
      description: 'Realiza el test vocacional online y descubre la carrera universitaria ideal. El test para saber qué estudiar te ayuda a descubrir tu vocación.',
      image: '',
      slug: '',
      email: '',
      keywords: 'test, test vocacional, tu carrera profesional, elegir carrera profesional, carrera universitaria, carrera profesional, profesional, tucarrera, tucarreraperu, tuca peru, tu carrera Perú, tu carrera profesional perú, vocacional, vocación, universidades, estudios superiores, pruebas vocacionales, elige tu carrera, escoger carrera',
      date: '',
      ...config
    };
    this.tilte.setTitle(config.title);

    // SEO natural
    this.meta.addTag({ name: 'email', content: 'tucarreraperu@gmail.com' }),
    this.meta.addTag({ name: 'robots', content: 'index, follow' }),
    this.meta.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1'  }),
    this.meta.addTag({ name: 'author', content: 'Tu Carrera Perú' }),
    this.meta.addTag({ name: 'description', content: config.description }),
    this.meta.addTag({ name: 'keywords', content: config.keywords }),
    // this.meta.addTag({ name: 'date', content: '2019-10-31', scheme: 'YYYY-MM-DD' }),
    this.meta.addTag({ charset: 'UTF-8' })


    // Redes Sociales 
    this.meta.addTag({ name: 'twitter:card', content: 'summary' });
    this.meta.addTag({ name: 'twitter:site', content: '@MiTwitter' });
    this.meta.addTag({ name: 'twitter:title', content: config.title });
    this.meta.addTag({ name: 'twitter:description', content: config.description });
    this.meta.addTag({ name: 'twitter:image', content: config.image });

    this.meta.addTag({ property: 'og:type', content: 'article' });
    this.meta.addTag({ property: 'og:site_name', content: 'Tu Carrera Perú' });
    this.meta.addTag({ property: 'og:title', content: config.title });
    this.meta.addTag({ property: 'og:description', content: config.description });
    this.meta.addTag({ property: 'og:image', content: config.image });
    this.meta.addTag({ property: 'og:url', content: config.slug });
  }
}
