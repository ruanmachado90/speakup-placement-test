# 📝 Códigos Prontos para WordPress

## ⚠️ ANTES DE COPIAR: Substitua `SEU-SITE.netlify.app` pela URL real do seu Netlify!

---

## 1️⃣ Código HTML Simple (Cole em qualquer Post/Página)

```html
<!-- SpeakUp Placement Test -->
<div style="position: relative; padding-bottom: 100vh; height: 0; overflow: hidden; max-width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 30px auto;">
  <iframe 
    src="https://SEU-SITE.netlify.app" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    title="SpeakUp English Placement Test"
    loading="lazy"
    allow="clipboard-write"
  ></iframe>
</div>

<style>
  /* Aumenta altura no mobile para melhor visualização */
  @media (max-width: 768px) {
    div[style*="padding-bottom: 100vh"] {
      padding-bottom: 150vh !important;
    }
  }
</style>
```

**Como usar:**
1. Edite a página/post no WordPress
2. Mude para modo **HTML** ou **Código**
3. Cole o código acima
4. **Substitua** `SEU-SITE.netlify.app` pela URL real
5. Publique

---

## 2️⃣ Shortcode PHP (Adicione em functions.php)

**Caminho**: WordPress Admin → Aparência → Editor de Temas → functions.php

Cole no final do arquivo:

```php
/**
 * SpeakUp Placement Test - Shortcode
 * Use: [speakup_quiz] ou [speakup_quiz height="120vh"]
 */
function speakup_placement_test_shortcode($atts) {
    // Configurações padrão
    $atts = shortcode_atts(array(
        'height' => '100vh',
        'url' => 'https://SEU-SITE.netlify.app', // ⚠️ SUBSTITUA AQUI
        'border' => 'yes',
        'shadow' => 'yes'
    ), $atts);
    
    // Estilos opcionais
    $border_radius = ($atts['border'] === 'yes') ? 'border-radius: 8px;' : '';
    $box_shadow = ($atts['shadow'] === 'yes') ? 'box-shadow: 0 4px 6px rgba(0,0,0,0.1);' : '';
    
    // Gerar HTML
    $output = '<div class="speakup-quiz-container" style="position: relative; padding-bottom: ' . esc_attr($atts['height']) . '; height: 0; overflow: hidden; max-width: 100%; ' . $border_radius . ' ' . $box_shadow . ' margin: 30px auto;">';
    $output .= '<iframe src="' . esc_url($atts['url']) . '" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" title="SpeakUp English Placement Test" loading="lazy" allow="clipboard-write"></iframe>';
    $output .= '</div>';
    
    // CSS responsivo
    $output .= '<style>
        @media (max-width: 768px) {
            .speakup-quiz-container {
                padding-bottom: 150vh !important;
            }
        }
    </style>';
    
    return $output;
}
add_shortcode('speakup_quiz', 'speakup_placement_test_shortcode');
```

**⚠️ IMPORTANTE**: Na linha 10, substitua `SEU-SITE.netlify.app` pela URL real!

**Como usar no conteúdo:**

Básico:
```
[speakup_quiz]
```

Com altura customizada:
```
[speakup_quiz height="120vh"]
```

Sem borda e sombra:
```
[speakup_quiz border="no" shadow="no"]
```

Com URL diferente (útil se tiver ambiente de teste):
```
[speakup_quiz url="https://teste.netlify.app"]
```

---

## 3️⃣ Template Full Page (Página Dedicada)

**Para criar uma página APENAS com o quiz (sem header/footer do WordPress):**

**Método A: Template Personalizado**

1. Crie arquivo `page-quiz.php` na pasta do tema:
   - Caminho: `wp-content/themes/SEU-TEMA/page-quiz.php`

2. Cole este código:

```php
<?php
/**
 * Template Name: Quiz Full Page
 * Description: Página dedicada para o Placement Test
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?> <?php bloginfo('name'); ?></title>
    <?php wp_head(); ?>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body, html {
            height: 100vh;
            width: 100vw;
            overflow: hidden;
        }
        #quiz-iframe {
            width: 100%;
            height: 100vh;
            border: none;
        }
        #admin-bar-spacer {
            height: 32px;
            background: #23282d;
        }
        body.admin-bar #quiz-iframe {
            height: calc(100vh - 32px);
        }
        @media screen and (max-width: 782px) {
            #admin-bar-spacer {
                height: 46px;
            }
            body.admin-bar #quiz-iframe {
                height: calc(100vh - 46px);
            }
        }
    </style>
</head>
<body <?php body_class(); ?>>
    <?php if (is_admin_bar_showing()) : ?>
        <div id="admin-bar-spacer"></div>
    <?php endif; ?>
    
    <iframe 
        id="quiz-iframe"
        src="https://SEU-SITE.netlify.app" 
        title="SpeakUp English Placement Test"
        allow="clipboard-write"
        loading="eager"
    ></iframe>
    
    <?php wp_footer(); ?>
</body>
</html>
```

3. Criar nova página:
   - WordPress Admin → Páginas → Adicionar Nova
   - Título: "Placement Test"
   - Template: Escolha **"Quiz Full Page"** no sidebar direito
   - Publique

**⚠️ IMPORTANTE**: Substitua `SEU-SITE.netlify.app` pela URL real!

---

**Método B: Plugin "Blank Canvas" (Mais Simples)**

1. Instale o plugin **"Blank Slate"** no WordPress
2. Crie nova página
3. Use o template "Blank Canvas"
4. Cole no conteúdo:

```html
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { margin: 0; padding: 0; }
        body, html { height: 100vh; overflow: hidden; }
        iframe { width: 100%; height: 100vh; border: none; }
    </style>
</head>
<body>
    <iframe src="https://SEU-SITE.netlify.app" title="Quiz"></iframe>
</body>
</html>
```

---

## 4️⃣ Widget para Sidebar (Opcional)

**Cole em functions.php:**

```php
/**
 * Widget: Link para Placement Test
 */
class SpeakUp_Quiz_Widget extends WP_Widget {
    
    function __construct() {
        parent::__construct(
            'speakup_quiz_widget',
            __('SpeakUp Placement Test', 'text_domain'),
            array('description' => __('Adiciona link para o teste de nivelamento', 'text_domain'))
        );
    }
    
    public function widget($args, $instance) {
        echo $args['before_widget'];
        
        if (!empty($instance['title'])) {
            echo $args['before_title'] . apply_filters('widget_title', $instance['title']) . $args['after_title'];
        }
        
        $url = !empty($instance['url']) ? $instance['url'] : 'https://SEU-SITE.netlify.app';
        $button_text = !empty($instance['button_text']) ? $instance['button_text'] : 'Fazer Teste de Nivelamento';
        
        echo '<div style="text-align: center; padding: 20px;">';
        echo '<a href="' . esc_url($url) . '" target="_blank" style="display: inline-block; background: #0e48fe; color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">' . esc_html($button_text) . '</a>';
        echo '</div>';
        
        echo $args['after_widget'];
    }
    
    public function form($instance) {
        $title = !empty($instance['title']) ? $instance['title'] : __('Placement Test', 'text_domain');
        $url = !empty($instance['url']) ? $instance['url'] : 'https://SEU-SITE.netlify.app';
        $button_text = !empty($instance['button_text']) ? $instance['button_text'] : 'Fazer Teste';
        ?>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('title')); ?>"><?php _e('Título:'); ?></label> 
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('title')); ?>" name="<?php echo esc_attr($this->get_field_name('title')); ?>" type="text" value="<?php echo esc_attr($title); ?>">
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('url')); ?>"><?php _e('URL do Quiz:'); ?></label> 
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('url')); ?>" name="<?php echo esc_attr($this->get_field_name('url')); ?>" type="text" value="<?php echo esc_attr($url); ?>">
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('button_text')); ?>"><?php _e('Texto do Botão:'); ?></label> 
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('button_text')); ?>" name="<?php echo esc_attr($this->get_field_name('button_text')); ?>" type="text" value="<?php echo esc_attr($button_text); ?>">
        </p>
        <?php 
    }
    
    public function update($new_instance, $old_instance) {
        $instance = array();
        $instance['title'] = (!empty($new_instance['title'])) ? strip_tags($new_instance['title']) : '';
        $instance['url'] = (!empty($new_instance['url'])) ? esc_url_raw($new_instance['url']) : '';
        $instance['button_text'] = (!empty($new_instance['button_text'])) ? strip_tags($new_instance['button_text']) : '';
        return $instance;
    }
}

function register_speakup_quiz_widget() {
    register_widget('SpeakUp_Quiz_Widget');
}
add_action('widgets_init', 'register_speakup_quiz_widget');
```

**Como usar:**
1. WordPress Admin → Aparência → Widgets
2. Arraste "SpeakUp Placement Test" para a sidebar
3. Configure o widget

---

## 5️⃣ Botão no Menu (Link Direto)

**Opção A: Menu Normal**

1. WordPress Admin → Aparência → Menus
2. Adicionar item → **Link Personalizado**
3. URL: `https://SEU-SITE.netlify.app`
4. Texto: "Placement Test" ou "Teste seu Inglês"
5. Salvar menu

**Opção B: Botão Destacado no Menu**

Cole em **Aparência → Customizar → CSS Adicional**:

```css
/* Destaca o link do quiz no menu */
#menu-item-999 a { /* Substitua 999 pelo ID real do item */
    background: linear-gradient(135deg, #ff9a3d 0%, #ff7a00 100%);
    color: white !important;
    padding: 10px 20px !important;
    border-radius: 25px;
    font-weight: bold;
    transition: transform 0.2s;
}

#menu-item-999 a:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(255, 154, 61, 0.4);
}
```

**Para descobrir o ID do item:**
1. Vá em Aparência → Menus
2. Expanda o item do quiz
3. Veja na URL: `menu-item-NUMERO`

---

## ✅ Resumo das Opções

| Método | Dificuldade | Melhor Para |
|--------|-------------|-------------|
| **HTML Simples** | ⭐ Fácil | Post/Página única |
| **Shortcode** | ⭐⭐ Médio | Reutilizar em várias páginas |
| **Full Page** | ⭐⭐⭐ Avançado | Experiência imersiva |
| **Widget** | ⭐⭐ Médio | Link na sidebar |
| **Menu** | ⭐ Fácil | Acesso rápido global |

---

## 🔧 Customizações CSS Extras

Cole em **Aparência → Customizar → CSS Adicional**:

```css
/* Ajusta padding em mobile */
@media (max-width: 768px) {
    .speakup-quiz-container {
        margin: 10px 0 !important;
    }
}

/* Remove scroll horizontal se aparecer */
.speakup-quiz-container {
    overflow-x: hidden !important;
}

/* Adiciona loading spinner enquanto carrega */
.speakup-quiz-container::before {
    content: "Carregando quiz...";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    color: #0e48fe;
    z-index: -1;
}
```

---

**📌 Lembre-se: Em TODOS os códigos acima, substitua `SEU-SITE.netlify.app` pela URL real do Netlify!**
