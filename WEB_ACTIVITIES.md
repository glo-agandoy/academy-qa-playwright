# 🚀 Ejercicios de Automatización con Playwright (WEB)

Este proyecto contiene una serie de desafíos prácticos para aprender y dominar las pruebas End-to-End (E2E) utilizando **Playwright**.

> ⚠️ **Importante**
>
> Por favor, no hagas uso de la IA para resolver estos ejercicios. El objetivo es que aprendas las bases de Playwright escribiendo el código por ti mismo.
>
> Durante la actividad puedes apoyarte en la documentación oficial:
> https://playwright.dev/docs/intro

Además de la automatización, también vamos a practicar **GitFlow**.

Descarga el proyecto y, si todavía no tienes configurado SSH, encontrarás un documento llamado **CONFIG_SSH.md** con los pasos necesarios.

⚠️ Recuerda que al clonar el repositorio descargarás la rama principal (`main`). Cada ejercicio deberá desarrollarse en **una rama independiente**.

No utilices los commits desde el IDE; realiza todos los commits mediante comandos de Git para familiarizarte con el flujo de trabajo.

Las ramas deberán seguir el siguiente formato:

```text
nombre-apellidos-titulo-de-la-actividad
```

Si necesitas repasar GitFlow, puedes consultar el siguiente curso:

https://globant.udemy.com/course/git-y-github-completo-desde-cero/

---

# 📋 Reglas generales

- Utiliza el patrón **Page Object Model (POM)**.
- Organiza correctamente los `test.describe()` y los `test()`.
- Aplica los principios **SOLID** cuando tenga sentido.
- Evita duplicar código.
- Utiliza los **locators** de Playwright de forma adecuada (`locator`).
- Aprovecha las **auto-waits** de Playwright antes de recurrir a esperas explícitas.
- Cada ejercicio debe incluir al menos una aserción (`expect`) que verifique el resultado esperado.
- Nombra los tests de forma descriptiva (qué hace, no cómo lo hace).

---

# 🟢 Nivel 1 – Click en botón

## 📌 Objetivo

Aprender a realizar un click y validar que provoca una acción.

### Path

```text
/add_remove_elements
```

### Acciones

1. Hacer click sobre el botón **Add Element**.

### Resultado esperado

- Verificar que aparece un botón con el texto **Delete**.

### 🎯 Reto extra

- Haz click en **Add Element** varias veces (por ejemplo, 5) y verifica que aparecen exactamente 5 botones **Delete**.
- Elimina uno de los botones **Delete** y verifica que el contador de botones visibles ha disminuido en 1.

---

# 🟡 Nivel 2 – Rellenar un input

## 📌 Objetivo

Aprender a completar un formulario y validar el resultado.

### Path

```text
/forgot_password
```

### Acciones

1. Completar el campo de email con un valor cualquiera.
2. Hacer click en el botón **Retrieve password**.

### Resultado esperado

- Verificar que se muestra una página con el texto **Internal Server Error**.

### 🎯 Reto extra

- Crea un segundo test que intente enviar el formulario con el campo de email **vacío** y documenta qué ocurre (¿se envía igualmente?, ¿hay validación del navegador?).
- Parametriza el email de entrada usando datos de prueba (por ejemplo, un array con distintos formatos de email) y ejecuta el mismo test para cada uno con `test.describe` + un bucle o `test.each`-like pattern.

---

# 🟠 Nivel 3 – Dropdown

## 📌 Objetivo

Aprender a interactuar con listas desplegables.

### Path

```text
/dropdown
```

### Acciones

1. Seleccionar de forma aleatoria la **Option 1** o la **Option 2**.

### Resultado esperado

- Verificar cuál es la opción seleccionada.

### 🎯 Reto extra

- Verifica también que la opción por defecto al cargar la página es **"Please select an option"** y que dicha opción está deshabilitada.
- Genera la selección aleatoria usando una función auxiliar reutilizable (ubícala en una carpeta `utils/`).

---

# 🟠 Nivel 4 – Checkboxes

## 📌 Objetivo

Aprender a trabajar con checkboxes.

### Path

```text
/checkboxes
```

### Acciones

1. Seleccionar un checkbox.

### Resultado esperado

- Verificar que el checkbox se encuentra seleccionado.

### 🎯 Reto extra

- Verifica el estado inicial de ambos checkboxes antes de interactuar (uno debería estar desmarcado y el otro marcado por defecto).
- Crea un test que marque **todos** los checkboxes de la página de forma dinámica (sin hardcodear el número de checkboxes) y verifique que todos quedan marcados.

---

# 🟠 Nivel 5 – Esperas

## 📌 Objetivo

Aprender a esperar la aparición de elementos utilizando las capacidades de Playwright.

### Path

```text
/entry_ad
```

### Acciones

1. Esperar a que aparezca el modal.
2. Cerrar el modal.

### Resultado esperado

- Verificar que el modal ya no es visible.

> 💡 **Pista:** Antes de utilizar esperas explícitas, recuerda que Playwright incorpora auto-waits de forma automática.

### 🎯 Reto extra

- Recarga la página tras cerrar el modal y comprueba si vuelve a aparecer (¿usa cookies o `localStorage`? investiga con `page.evaluate` o las devtools).
- Investiga y documenta la diferencia entre `waitForSelector`, `waitForLoadState` y las auto-waits implícitas de acciones como `.click()`.

---

# 🏁 Ejercicio Final #1 – Framework E2E completo

## 🎯 Objetivo

Implementar técnicas avanzadas para construir un framework de automatización mantenible y escalable.

## El desafío

Debes crear un flujo E2E que haga uso de:

### 1. Hooks

Utiliza al menos uno de los hooks disponibles en Playwright:

- `beforeAll`
- `beforeEach`
- `afterEach`
- `afterAll`

### 2. Separación de responsabilidades

Organiza correctamente el proyecto utilizando, por ejemplo:

- Page Objects
- Helpers
- Utils
- Fixtures (si lo consideras necesario)

### 3. Ejecución Multi Browser

El test deberá ejecutarse correctamente, al menos, en:

- Chromium
- Firefox
- WebKit

### 4. Reporting

- Configura el reporter HTML de Playwright (`playwright.config.ts`) y adjunta capturas de pantalla en caso de fallo (`screenshot: 'only-on-failure'`).
- Opcional: activa `trace: 'on-first-retry'` para poder depurar fallos con el Trace Viewer.

## El objetivo de esta actividad

Ser **creativos** y aplicar todo lo aprendido, además de investigar la documentación oficial de Playwright.

La idea principal es desarrollar un flujo **End-to-End** sobre una aplicación web real.

### 🔌 Webs propuestas

- 👉 [Automation Exercise](https://automationexercise.com/)
- 👉 [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/web/index.php/auth/login)
- 🚀 Extra: si os animáis, podéis crear vuestra propia aplicación web y automatizarla.

### 💡 Ideas de flujo E2E (elige uno o combina varios)

- Login → navegación a un módulo → creación de un recurso → verificación de que aparece en un listado → logout.
- Búsqueda de un producto → añadir al carrito → verificar el total del carrito → proceder al checkout hasta la pantalla de confirmación.
- Alta de un empleado (OrangeHRM) → edición de sus datos → verificación de los cambios reflejados en su perfil.

---

# 🏁 Ejercicio Final #2 – Playwright MCP Server y Agentes de IA

## 🎯 Objetivo

Explorar cómo la IA agencial puede apoyarse en Playwright a través de su **MCP Server** oficial, entendiendo la diferencia entre **escribir tests con Playwright** (lo que habéis hecho en los niveles anteriores) y **usar Playwright como herramienta de un agente**.

> 📖 Documentación oficial: https://github.com/microsoft/playwright-mcp

## ¿Qué es el Playwright MCP Server?

Es un servidor que implementa el **Model Context Protocol (MCP)** y expone el navegador controlado por Playwright como un conjunto de **herramientas** (`navigate`, `click`, `type`, `snapshot`, etc.) que un agente de IA (como Claude u otros modelos compatibles con MCP) puede invocar de forma autónoma para interactuar con páginas web reales, en lugar de depender de scripts de test escritos a mano.

La diferencia clave frente a lo que habéis practicado:

| Playwright "clásico" (Niveles 1-5)   | Playwright MCP + Agente                                                 |
| ------------------------------------ | ----------------------------------------------------------------------- |
| Vosotros escribís el código del test | El agente decide qué acciones tomar                                     |
| El flujo es fijo y determinista      | El flujo puede adaptarse dinámicamente a la página                      |
| Se ejecuta con `npx playwright test` | Se ejecuta a través de un cliente MCP (ej. Claude Desktop, Claude Code) |
| Usa locators y aserciones explícitas | Usa "accessibility snapshots" para que el agente entienda la página     |

## El desafío

### 1. Configuración del servidor

- Instala y configura el **Playwright MCP Server** siguiendo la documentación oficial.
- Conéctalo a un cliente compatible con MCP (por ejemplo, Claude Desktop o Claude Code).
- Documenta en un `README.md` los pasos de instalación y configuración que has seguido, incluyendo cualquier problema que hayas encontrado y cómo lo resolviste.

### 2. Experimentación guiada

Sobre una de las webs propuestas (Automation Exercise u OrangeHRM), pide al agente —en lenguaje natural, sin escribir código de test tú mismo— que realice un flujo equivalente al que ya automatizaste en el Ejercicio Final #1. Por ejemplo:

- "Inicia sesión en OrangeHRM con estas credenciales y dime qué módulos aparecen en el menú lateral."
- "Busca un producto en Automation Exercise, añádelo al carrito y dime el precio total."

### 3. Análisis comparativo (lo más importante de esta actividad)

Redacta un documento breve (`ANALISIS_MCP.md`) donde compares tu experiencia:

- ¿Qué ventajas observaste al usar el agente frente a escribir el test tú mismo?
- ¿Qué limitaciones o comportamientos inesperados tuvo el agente? (por ejemplo: pasos innecesarios, interpretaciones erróneas de la página, lentitud, falta de determinismo).
- ¿En qué casos usarías Playwright "clásico" y en cuáles un agente con MCP? Piensa en términos de: fiabilidad para CI/CD, mantenibilidad, velocidad, y necesidad de repetibilidad exacta.
- ¿Qué relación ves entre el "accessibility snapshot" que usa el MCP Server y las buenas prácticas de locators (`getByRole`, `getByText`) que aplicasteis en los niveles anteriores?

### 4. (Opcional / avanzado) Automatización híbrida

Si quieres ir más allá, investiga cómo podrías:

- Usar el agente para **generar un primer borrador** de un test de Playwright observando el flujo que ejecuta, y luego revisarlo y limpiarlo tú mismo aplicando POM y SOLID.
- Integrar el MCP Server como parte de un flujo de _exploratory testing_ asistido, donde el agente detecta posibles casos límite que luego conviertes en tests deterministas escritos por ti.

## Criterios de evaluación de esta actividad

- Evidencia de que el MCP Server quedó correctamente configurado y funcional.
- Calidad y honestidad del análisis comparativo (no se busca una respuesta "correcta", sino reflexión crítica).
- Claridad en la documentación de los pasos seguidos.

---

# 💪 ¡Mucho ánimo y a por ello!
