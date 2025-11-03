# 📸 Afbeeldingen Handleiding - Pottenbakkerij de Graal

## 📁 Waar plaats ik afbeeldingen?

### Product Foto's
Plaats alle product afbeeldingen in:
```
public/images/products/
```

**Bestandsnamen moeten exact overeenkomen met de namen in `data/products.json`**

Bijvoorbeeld:
- `mok-espresso-1.jpg`
- `mok-cappuccino-1.jpg`
- `mok-thee-1.jpg`
- `schaal-ontbijt-1.jpg`
- `schaal-soep-1.jpg`
- `schaal-decoratief-1.jpg`
- `vaas-smal-1.jpg`
- `vaas-buikig-1.jpg`
- `bord-dinner-1.jpg`
- `bord-dessert-1.jpg`
- `bord-serveer-1.jpg`

### Hero / Banner Afbeeldingen
Voor hero sectie, about pagina, etc:
```
public/images/
  ├── hero-atelier.jpg
  ├── about-workspace.jpg
  ├── process-throwing.jpg
  └── ...
```

### Logo
```
public/
  ├── logo.png
  └── logo-white.png
```

---

## ✅ Beste Praktijken voor Product Foto's

### 1. **Formaat & Ratio**
- ✅ **Vierkant (1:1 ratio)** - bijvoorbeeld 1200x1200px
- ✅ Minimaal 800x800px voor goede kwaliteit
- ✅ Maximaal 2000x2000px (te groot = langzaam laden)

### 2. **Bestandsformaat**
- ✅ **JPG** voor foto's (beste compressie)
- ✅ **PNG** voor afbeeldingen met transparantie (logo's)
- ✅ **WebP** voor moderne browsers (Next.js converteert automatisch)

### 3. **Optimalisatie**
Comprimeer je afbeeldingen VOOR upload:
- 🔧 [TinyPNG](https://tinypng.com/) - Gratis, eenvoudig
- 🔧 [Squoosh](https://squoosh.app/) - Browser tool
- 🔧 ImageOptim (Mac) - Desktop app

**Doel:** 100-300kb per afbeelding

### 4. **Belichting & Achtergrond**
- ✅ Natuurlijk licht of softbox
- ✅ Neutrale achtergrond (wit, lichtgrijs, of hout)
- ✅ Consistent over alle producten
- ✅ Meerdere hoeken (voorkant, zijkant, bovenkant)

### 5. **Meerdere Afbeeldingen per Product**
Je kunt meerdere foto's toevoegen in `data/products.json`:
```json
"images": [
  {
    "src": "/images/products/mok-espresso-1.jpg",
    "alt": "Handgemaakte espresso mok - voorkant"
  },
  {
    "src": "/images/products/mok-espresso-2.jpg",
    "alt": "Handgemaakte espresso mok - bovenkant"
  },
  {
    "src": "/images/products/mok-espresso-3.jpg",
    "alt": "Handgemaakte espresso mok - detail glazuur"
  }
]
```

---

## 🖼️ Placeholder Afbeeldingen (Tijdelijk)

Als je nog geen foto's hebt, kun je tijdelijk placeholders gebruiken:
1. Genereer gratis mockups op [Pexels](https://www.pexels.com/search/pottery/) of [Unsplash](https://unsplash.com/s/photos/ceramic)
2. Of gebruik een placeholder service:
   ```
   https://placehold.co/800x800/b96f4a/white?text=Mok
   ```

---

## 📸 Foto Tips voor Keramiek

### Wat te fotograferen:
1. **Hoofd foto** - Product op neutrale achtergrond, licht van schuin boven
2. **Detail foto** - Textuur glazuur, handgemaakt karakter
3. **Schaal foto** - Product in gebruik of naast voorwerp voor grootte-indicatie
4. **Lifestyle foto** - Op gedekte tafel of in interieur (optioneel)

### Styling tips:
- Gebruik natuurlijke materialen (linnen, hout) in de foto
- Voeg subtiele schaduwen toe met diffuus licht
- Fotografeer op ooghoogte met het product
- Gebruik een effen achtergrond (geen patroon)

---

## 🔄 Afbeeldingen Bijwerken

### Nieuwe producten toevoegen:
1. Maak foto's volgens bovenstaande richtlijnen
2. Optimaliseer de afbeeldingen
3. Plaats ze in `public/images/products/`
4. Update `data/products.json` met de bestandsnaam
5. Run `npm run db:seed` om database bij te werken

### Bestaande foto's vervangen:
1. Vervang het bestand in `public/images/products/`
2. Gebruik **exact dezelfde bestandsnaam**
3. Hard refresh je browser (Cmd/Ctrl + Shift + R)

---

## 🎨 Afbeeldingen voor Andere Pagina's

### About Pagina
Plaats deze afbeeldingen in `public/images/`:
- `about-hero.jpg` - Jij aan de draaischijf
- `about-atelier.jpg` - Overzicht van je werkruimte
- `about-process.jpg` - Close-up van het proces

### Homepage Hero
- `hero-main.jpg` - Sfeerbeeld atelier of product

### Contact Pagina
- `contact-atelier.jpg` - Buitenkant atelier (optioneel)

---

## ⚡ Performance Tips

Next.js optimaliseert afbeeldingen automatisch met de `<Image>` component:
- ✅ Automatische compressie
- ✅ Lazy loading (pas laden als zichtbaar)
- ✅ Responsive images (juiste grootte per scherm)
- ✅ Modern formats (WebP/AVIF)

**Je hoeft niets extra's te doen - plaats gewoon de JPG/PNG bestanden!**

---

## 📋 Checklist voor Nieuwe Producten

- [ ] Product foto's gemaakt (minimaal 1, ideaal 3-4)
- [ ] Afbeeldingen geoptimaliseerd (< 300kb per foto)
- [ ] Vierkant formaat (1:1 ratio)
- [ ] Bestand geplaatst in `public/images/products/`
- [ ] Beschrijvende alt-text geschreven
- [ ] Product toegevoegd aan `data/products.json`
- [ ] Database geseeded: `npm run db:seed`
- [ ] Product zichtbaar op website gecontroleerd

---

## 🆘 Problemen?

### "Afbeelding laadt niet"
1. ✅ Check of bestandsnaam exact overeenkomt (hoofdlettergevoelig!)
2. ✅ Check of bestand in `public/images/products/` staat
3. ✅ Hard refresh: Cmd/Ctrl + Shift + R
4. ✅ Check browser console voor fouten (F12)

### "Afbeelding is wazig"
1. ✅ Upload een hogere resolutie (minimaal 800x800px)
2. ✅ Controleer of origineel scherp is

### "Pagina laadt langzaam"
1. ✅ Optimaliseer je afbeeldingen met TinyPNG
2. ✅ Check bestandsgrootte (< 300kb per foto)

---

**Pro tip:** Maak een consistent bestand naamgevingsschema aan vanaf het begin. Bijvoorbeeld: `categorie-productnaam-nummer.jpg`
