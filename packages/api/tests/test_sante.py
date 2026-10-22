def test_route_de_sante(client):
    reponse = client.get("/api/sante/")
    assert reponse.status_code == 200
    assert reponse.json() == {"statut": "ok"}
    