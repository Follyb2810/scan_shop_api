## **1. Basic Structure of Swagger JSDoc in Express**

```ts
/**
 * @openapi
 * /path:
 *   METHOD:          # get, post, put, patch, delete
 *     tags:
 *       - TagName     # group routes in Swagger UI
 *     summary: Short description of what this endpoint does
 *     description: Optional longer description
 *     security:      # optional, for auth
 *       - bearerAuth: []
 *     parameters:    # optional, for path/query/header parameters
 *       - name: paramName
 *         in: path    # path | query | header
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:   # optional, for POST/PUT/PATCH with JSON body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field1:
 *                 type: string
 *               field2:
 *                 type: number
 *             required:
 *               - field1
 *     responses:     # mandatory
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request
 */
```

## **2. Components You Can Use**

### **Security Schemes**

```ts
components: securitySchemes: bearerAuth: type: http;
scheme: bearer;
bearerFormat: JWT;
```

### **Reusable Schemas**

If you want to reuse objects like `User` or `Product`:

```ts
components: schemas: User: type: object;
properties: id: type: string;
email: type: string;
firstName: type: string;
lastName: type: string;
```

Then in your endpoint:

```ts
requestBody:
  content:
    application/json:
      schema:
        $ref: '#/components/schemas/User'
```

---

## **3. Parameters**

- **Path Parameters**:

```ts
parameters:
  - name: id
    in: path
    required: true
    schema:
      type: string
```

- **Query Parameters**:

```ts
parameters:
  - name: page
    in: query
    required: false
    schema:
      type: integer
```

---

## **4. Responses**

- **Basic JSON response:**

```ts
responses:
  200:
    description: Success
    content:
      application/json:
        schema:
          type: object
          properties:
            message:
              type: string
```

- **Array response:**

```ts
responses:
  200:
    description: List of products
    content:
      application/json:
        schema:
          type: array
          items:
            $ref: '#/components/schemas/Product'
```

---

## **5. Example Full Endpoint**

```ts
/**
 * @openapi
 * /api/v1/user/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Get user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
```
