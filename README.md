# FloatingNav Framework

Un framework JavaScript léger pour créer des barres de navigation flottantes élégantes avec effets glassmorphism, animations fluides et design responsive.

![FloatingNav Preview](https://via.placeholder.com/800x400/333/fff?text=FloatingNav+Preview)

## Fonctionnalités

- Effet glassmorphism (verre liquide)
- Positionnement flexible (9 positions disponibles)
- Animations fluides
- Design responsive
- Thèmes adaptatifs (light/dark/auto)
- API simple et intuitive
- Support des icônes SVG et emojis
- Tooltips intégrés
- Auto-hide optionnel
- Vibration feedback (mobile)

## Installation

### Via CDN

```html
<script src="https://cdn.jsdelivr.net/gh/yourusername/floating-nav@1.0.0/floating_nav_framework.js"></script>
```

### Via NPM

```bash
npm install floating-nav-framework
```

```javascript
import FloatingNavFramework from 'floating-nav-framework';
const FloatingNav = new FloatingNavFramework();
```

## Utilisation de base

### Création d'une barre de navigation

```javascript
FloatingNav.create('main-nav', [
    {
        icon: FloatingNav.icons.home,
        text: 'Accueil',
        href: '/',
        tooltip: 'Retour à l\'accueil'
    },
    {
        icon: FloatingNav.icons.search,
        text: 'Recherche',
        onClick: () => console.log('Recherche cliquée')
    },
    {
        icon: '⭐',
        text: 'Favoris',
        href: '/favorites'
    }
], {
    position: 'bottom-center',
    theme: 'auto',
    blur: 20
});
```

### Exemple avec emojis

```javascript
FloatingNav.create('emoji-nav', [
    { icon: '🏠', tooltip: 'Accueil', href: '/' },
    { icon: '🔍', tooltip: 'Recherche', onClick: () => {} },
    { icon: '⚙️', tooltip: 'Réglages', href: '/settings' }
], {
    position: 'top-right',
    iconSize: 28
});
```

### Barre de navigation latérale

```javascript
FloatingNav.create('side-nav', [
    {
        icon: FloatingNav.icons.user,
        tooltip: 'Profil',
        href: '/profile'
    },
    {
        icon: FloatingNav.icons.mail,
        tooltip: 'Messages',
        indicator: true
    },
    {
        icon: FloatingNav.icons.settings,
        tooltip: 'Paramètres'
    }
], {
    position: 'left-center',
    theme: 'dark',
    borderRadius: 15
});
```

## Options de configuration

| Option          | Type    | Défaut         | Description |
|-----------------|---------|----------------|-------------|
| position        | string  | 'bottom-center' | Position de la barre (top/bottom/left/right + -left/-center/-right) |
| theme           | string  | 'auto'         | Thème: 'light', 'dark' ou 'auto' |
| blur            | number  | 20             | Intensité du flou glassmorphism (px) |
| opacity         | number  | 0.8            | Opacité du fond |
| borderRadius    | number  | 20             | Rayon des coins (px) |
| padding         | number  | 15             | Espacement interne (px) |
| gap             | number  | 12             | Espace entre les éléments (px) |
| iconSize        | number  | 24             | Taille des icônes (px) |
| showLabels      | boolean | false          | Afficher les textes sous les icônes |
| autoHide        | boolean | false          | Masquer automatiquement après inactivité |
| hideDelay       | number  | 3000           | Délai avant auto-hide (ms) |
| vibration       | boolean | true           | Feedback haptique au clic |

## Méthodes API

```javascript
// Mettre à jour une barre existante
FloatingNav.update('main-nav', newItems, newConfig);

// Afficher une barre
FloatingNav.show('main-nav');

// Masquer une barre
FloatingNav.hide('main-nav');

// Changer le thème
FloatingNav.setTheme('main-nav', 'dark');

// Supprimer une barre
FloatingNav.destroy('main-nav');
```

## Icônes intégrées

Le framework inclut des icônes SVG communes :

```javascript
FloatingNav.icons.home      // Icône maison
FloatingNav.icons.user      // Icône utilisateur
FloatingNav.icons.search    // Icône recherche
FloatingNav.icons.settings  // Icône paramètres
FloatingNav.icons.heart     // Icône coeur
FloatingNav.icons.star      // Icône étoile
FloatingNav.icons.mail      // Icône email
FloatingNav.icons.phone     // Icône téléphone
FloatingNav.icons.menu      // Icône menu
FloatingNav.icons.close     // Icône fermer
```

## Licence

MIT License - Libre d'utilisation pour tout projet, commercial ou personnel.

